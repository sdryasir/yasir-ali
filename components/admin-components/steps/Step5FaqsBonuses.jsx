'use client';

import { useState, useEffect } from 'react';

export default function Step5FaqsBonuses({ data, update, goNext, goBack }) {
  const [faqs, setFaqs] = useState(data.faqs);
  const [bonuses, setBonuses] = useState(data.bonuses);
  const [whyTakeThisCourse, setWhyTakeThisCourse] = useState(data.whyTakeThisCourse);

  useEffect(() => {
    update({ faqs, bonuses, whyTakeThisCourse });
  }, [faqs, bonuses, whyTakeThisCourse]);

  // FAQs handlers
  const handleFaqChange = (index, field, value) => {
    const updatedFaqs = [...faqs];
    updatedFaqs[index] = { ...updatedFaqs[index], [field]: value };
    setFaqs(updatedFaqs);
  };

  const addFaq = () => setFaqs([...faqs, { question: '', answer: '' }]);
  const removeFaq = (index) => setFaqs(faqs.filter((_, i) => i !== index));

  // Bonuses handlers
  const handleBonusChange = (index, value) => {
    const newBonuses = [...bonuses];
    newBonuses[index] = value;
    setBonuses(newBonuses);
  };

  const addBonus = () => setBonuses([...bonuses, '']);
  const removeBonus = (index) => setBonuses(bonuses.filter((_, i) => i !== index));

  // WhyTakeThisCourse handlers
  const handleWhyChange = (index, value) => {
    const newWhy = [...whyTakeThisCourse];
    newWhy[index] = value;
    setWhyTakeThisCourse(newWhy);
  };

  const addWhy = () => setWhyTakeThisCourse([...whyTakeThisCourse, '']);
  const removeWhy = (index) => setWhyTakeThisCourse(whyTakeThisCourse.filter((_, i) => i !== index));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        goNext();
      }}
    >
      <h5>FAQs</h5>
      {faqs.map((faq, i) => (
        <div key={i} className="border p-3 mb-3 rounded">
          <div className="mb-3">
            <label className="form-label">Question</label>
            <input
              type="text"
              className="form-control"
              value={faq.question}
              onChange={(e) => handleFaqChange(i, 'question', e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Answer</label>
            <textarea
              className="form-control"
              rows={2}
              value={faq.answer}
              onChange={(e) => handleFaqChange(i, 'answer', e.target.value)}
            />
          </div>

          <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => removeFaq(i)}>
            Remove FAQ
          </button>
        </div>
      ))}
      <button type="button" className="btn btn-sm btn-outline-primary mb-4" onClick={addFaq}>
        + Add FAQ
      </button>

      <h5>Bonuses</h5>
      {bonuses.map((bonus, i) => (
        <div key={i} className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            value={bonus}
            onChange={(e) => handleBonusChange(i, e.target.value)}
            placeholder="Bonus"
          />
          {i > 0 && (
            <button type="button" className="btn btn-outline-danger" onClick={() => removeBonus(i)}>
              Remove
            </button>
          )}
        </div>
      ))}
      <button type="button" className="btn btn-sm btn-outline-primary mb-4" onClick={addBonus}>
        + Add Bonus
      </button>

      <h5>Why Take This Course</h5>
      {whyTakeThisCourse.map((item, i) => (
        <div key={i} className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            value={item}
            onChange={(e) => handleWhyChange(i, e.target.value)}
            placeholder="Reason"
          />
          {i > 0 && (
            <button type="button" className="btn btn-outline-danger" onClick={() => removeWhy(i)}>
              Remove
            </button>
          )}
        </div>
      ))}
      <button type="button" className="btn btn-sm btn-outline-primary mb-4" onClick={addWhy}>
        + Add Reason
      </button>

      <div className="d-flex justify-content-between">
        <button type="button" className="btn btn-secondary" onClick={goBack}>
          Back
        </button>
        <button type="submit" className="btn btn-primary">
          Next
        </button>
      </div>
    </form>
  );
}
