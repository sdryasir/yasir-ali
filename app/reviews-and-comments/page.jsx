'use client';

import InnerPageHeader from '@/components/InnerPageHeader';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
export default function CommentsPage() {
  const [comments, setComments] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [loading, setLoading] = useState(false);
  const limit = 6;

  const fetchComments = async (page) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/comments?page=${page}&limit=${limit}`);
      const data = await res.json();
      setComments(data.comments);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchComments(pagination.page);
  }, [pagination.page]);

  const goToPage = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination((prev) => ({ ...prev, page: newPage }));
    }
  };

  const renderPageNumbers = () => {
    const { page, totalPages } = pagination;
    const pageNumbers = [];
    const maxVisible = 3;

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);

      if (page > maxVisible) {
        pageNumbers.push('...');
      }

      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);

      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }

      if (page < totalPages - maxVisible + 1) {
        pageNumbers.push('...');
      }

      pageNumbers.push(totalPages);
    }

    return pageNumbers.map((p, i) =>
      p === '...' ? (
        <li key={i} className="page-item disabled">
          <span className="page-link">...</span>
        </li>
      ) : (
        <li
          key={i}
          className={`page-item ${pagination.page === p ? 'active' : ''}`}
        >
          <button className="page-link" onClick={() => goToPage(p)}>
            {p}
          </button>
        </li>
      )
    );
  };

  return (
    <>
    <InnerPageHeader title={'Comments & Questions'}/>
    <div className="container mt-5">
      <h4 className="mb-4">User Comments & Questions</h4>

      {loading ? (
        <Skeleton count={6} height={20} className="mt-3" />
      ) : (
        <ul className="list-group mb-4">
          {comments.map((comment) => (
            <li key={comment._id} className="list-group-item p-0 comment-item">
              <a href={comment.videoUrl} target='_blank' style={{textDecoration:'none', color:'#000'}}>
                <div className='p-3'>
                    <p className="mb-2">{comment.text}</p>
                    <Image src={comment.authorImage} width={30} height={30} className='rounded' alt={comment.videoTitle}/>
                    <small className="text-muted ms-2">{comment.author}</small>
                </div>
              </a>
            </li>
          ))}
        </ul>
      )}

      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${pagination.page === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => goToPage(pagination.page - 1)}>
              Previous
            </button>
          </li>

          {renderPageNumbers()}

          <li
            className={`page-item ${pagination.page === pagination.totalPages ? 'disabled' : ''}`}
          >
            <button className="page-link" onClick={() => goToPage(pagination.page + 1)}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
    </>
  );
}
