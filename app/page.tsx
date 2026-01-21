'use client';
import { useState } from 'react';
import { PRODUCT_OPTIONS, SCENARIO_OPTIONS } from '@/lib/options';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); // 控制成功彈窗狀態

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 1. 彈出瀏覽器內建確認視窗
    const confirmSubmit = window.confirm("Are you sure you want to submit this application?");
    if (!confirmSubmit) return;

    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        // 2. 成功後顯示自定義彈窗
        setShowSuccess(true);
        (e.target as HTMLFormElement).reset();
      } else {
        alert('Submission failed. Please check your network or API settings.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] relative">
      {/* 頂部漸層橫幅 */}
      <div className="h-64 bg-gradient-to-r from-[#dcfce7] via-[#f0fdf4] to-[#ccfbf1] relative overflow-hidden flex flex-col justify-center px-12">
        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Trial Service Application</h1>
          <p className="text-gray-600 max-w-2xl">
            Please submit application info. Service will be opened after BDM/PM approval.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
          <svg viewBox="0 0 400 400" className="w-full h-full text-teal-400">
            <path d="M200 0 L400 200 L200 400 L0 200 Z" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* 主要內容區 */}
      <div className="max-w-6xl mx-auto px-4 -mt-12 pb-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 左側：表單卡片 */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* 產品選擇 */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Product & Service <span className="text-red-500">*</span>
                </label>
                <select name="product" required className="w-full border border-gray-300 rounded-md p-2.5 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none">
                  <option value="">Please Select</option>
                  {PRODUCT_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>

              {/* 應用場景 */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Application Scenario <span className="text-red-500">*</span>
                </label>
                <select name="scenario" required className="w-full border border-gray-300 rounded-md p-2.5 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none">
                  <option value="">Please Select</option>
                  {SCENARIO_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>

              {/* 企業名稱 */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Company Name</label>
                <input name="company" type="text" placeholder="Organization name" className="w-full border border-gray-300 rounded-md p-2.5 outline-none focus:ring-2 focus:ring-blue-500" />
              </div>

              {/* 聯繫人 & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Contact Name <span className="text-red-500">*</span></label>
                  <input name="contactName" required type="text" className="w-full border border-gray-300 rounded-md p-2.5 outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Contact Email <span className="text-red-500">*</span></label>
                  <input name="contactEmail" required type="email" placeholder="abcd@mail.com" className="w-full border border-gray-300 rounded-md p-2.5 outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>

              {/* BDM & Sales */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    BDM Contact <span className="text-red-500">*</span>
                  </label>
                  <input name="bdm" required type="text" placeholder="e.g. Jason.Wang" className="w-full border border-gray-300 rounded-md p-2.5 outline-none focus:ring-2 focus:ring-blue-500"/>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Sales Contact <span className="text-red-500">*</span>
                  </label>
                  <input name ="sales" required type="text" placeholder="e.g. Amy.Lee" className="w-full border border-gray-300 rounded-md p-2.5 outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
              </div>

              {/* 留言說明 */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Comments <span className="text-red-500">*</span></label>
                <textarea name="comments" required rows={4} className="w-full border border-gray-300 rounded-md p-2.5 outline-none focus:ring-2 focus:ring-blue-500" placeholder="Please describe your needs..."></textarea>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={loading}
                className="bg-[#0091da] hover:bg-[#007bbd] text-white font-bold py-2.5 px-8 rounded shadow-md transition-all active:scale-95 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : 'Submit'}
              </button>
            </form>
          </div>

          {/* 右側：側邊欄 */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold mb-4 text-gray-800">Support Resources</h3>
              <p className="text-sm text-gray-500 mb-6">If you need further assistance, please refer to:</p>
              <div className="space-y-3">
                {['Technical Documents', 'Training & Certification', 'GitHub', 'Contact Us'].map((item) => (
                  <button key={item} type="button" className="w-full flex items-center justify-between border border-[#0091da] text-[#0091da] rounded px-4 py-2 hover:bg-[#f0f9ff] transition-colors group">
                    <span className="text-sm font-medium">{item}</span>
                    <span className="text-lg group-hover:translate-x-1 transition-transform">›</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 成功彈窗 (Success Modal) */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full text-center animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Submitted!</h2>
            <p className="text-gray-600 mb-8">Your trial application has been successfully recorded. Our team will contact you soon.</p>
            <button 
              onClick={() => setShowSuccess(false)}
              className="w-full bg-gray-900 text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition-colors"
            >
              Great, thanks!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}