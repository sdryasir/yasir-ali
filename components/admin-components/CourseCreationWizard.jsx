// CourseCreationWizard.jsx
'use client';

import { useState } from 'react';
import Step1BasicInfo from './steps/Step1BasicInfo';
import Step2MediaPricing from './steps/Step2MediaPricing';
import Step3Features from './steps/Step3Features';
import Step4TopicBreakdown from './steps/Step4TopicBreakdown';
import Step5FaqsBonuses from './steps/Step5FaqsBonuses';
import Step6FinalSubmit from './steps/Step6FinalSubmit';

const steps = [
  'Basic Info',
  'Media & Pricing',
  'Features',
  'Topic Breakdown',
  'FAQs & Bonuses',
  'Final Submit'
];

export default function CourseCreationWizard({ categories }) {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    shortDescription: '',
    description: '',
    category: '',
    level: '',
    tags: [''],
    thumbnail: null,
    introVideo: '',
    price: '',
    discountedPrice: '',
    duration: '',
    instructor: '',
    features: {
      mode: 'Online',
      accessType: 'Paid',
      startType: 'On Demand',
      prerequisites: [''],
      language: '',
    },
    topicBreakdown: [],
    faqs: [],
    bonuses: [''],
    whyTakeThisCourse: [''],
  });

  const goNext = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const updateFormData = (newData) => {
    
    setFormData((prev) => ({ ...prev, ...newData }));

    console.log('Updated Form Data:', formData);
    

  };

  const onSubmit = async () => {
    const form = new FormData();
    form.append('title', formData.title);
    form.append('slug', formData.slug);
    form.append('shortDescription', formData.shortDescription);
    form.append('description', formData.description);
    form.append('category', formData.category);
    form.append('instructor', formData.instructor);
    form.append('price', formData.price);
    form.append('discountedPrice', formData.discountedPrice);
    form.append('duration', formData.duration);
    form.append('level', formData.level);
    form.append('introVideo', formData.introVideo);

    // JSON fields
    form.append('tags', JSON.stringify(formData.tags));
    form.append('bonuses', JSON.stringify(formData.bonuses));
    form.append('topicBreakdown', JSON.stringify(formData.topicBreakdown));
    form.append('faqs', JSON.stringify(formData.faqs));
    form.append('features', JSON.stringify(formData.features));
    form.append('whyTakeThisCourse', JSON.stringify(formData.whyTakeThisCourse));

    // Thumbnail
    form.append('thumbnail', formData.thumbnail); // file is from <input type="file">
    setIsSubmitting(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/courses`, {
        method: 'POST',
        body: form,
      });
      setIsSubmitting(false);
      if (!response.ok) {
        
        throw new Error('Failed to create course');
      }

      const result = await response.json();
      console.log('Course created successfully:', result);
      alert('Course created successfully!');
    } catch (error) {
      console.error('Error creating course:', error);
      setIsSubmitting(false);
      alert('Failed to create course. Please try again.');
    }
  }

  return (
    <div className="container mt-4">
      <div className="bg-success p-2 text-white mb-3">
        <h4>Step {step + 1} of 6 - {steps[step]}</h4>
      </div>

      <div className="multistep-wrapper bg-light p-4 rounded shadow">
          {step === 0 && <Step1BasicInfo data={formData} update={updateFormData} categories={categories} goNext={goNext} />}
          {step === 1 && <Step2MediaPricing data={formData} update={updateFormData} goNext={goNext} goBack={goBack} />}
          {step === 2 && <Step3Features data={formData} update={updateFormData} goNext={goNext} goBack={goBack} />}
          {step === 3 && <Step4TopicBreakdown data={formData} update={updateFormData} goNext={goNext} goBack={goBack} />}
          {step === 4 && <Step5FaqsBonuses data={formData} update={updateFormData} goNext={goNext} goBack={goBack} />}
          {step === 5 && <Step6FinalSubmit data={formData} onSubmit={onSubmit} isSubmitting={isSubmitting} goBack={goBack} />}
      </div>
    </div>
  );
}
