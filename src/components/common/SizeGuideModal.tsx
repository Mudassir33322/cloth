import React, { useState } from 'react';
import { X, Ruler } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: string;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({
  isOpen,
  onClose,
  category = 'women',
}) => {
  const [unit, setUnit] = useState<'in' | 'cm'>('in');

  if (!isOpen) return null;

  const womenData = [
    { size: 'XS', us: '0 - 2', uk: '4 - 6', eu: '32 - 34', bustIn: '31 - 33', bustCm: '79 - 84', waistIn: '24 - 25', waistCm: '61 - 64', hipIn: '34 - 35', hipCm: '86 - 89' },
    { size: 'S', us: '4 - 6', uk: '8 - 10', eu: '36 - 38', bustIn: '34 - 35', bustCm: '86 - 89', waistIn: '26 - 27', waistCm: '66 - 69', hipIn: '36 - 37', hipCm: '91 - 94' },
    { size: 'M', us: '8 - 10', uk: '12 - 14', eu: '40 - 42', bustIn: '36 - 37', bustCm: '91 - 94', waistIn: '28 - 29', waistCm: '71 - 74', hipIn: '38 - 39', hipCm: '97 - 99' },
    { size: 'L', us: '12 - 14', uk: '16 - 18', eu: '44 - 46', bustIn: '38 - 40', bustCm: '97 - 102', waistIn: '30 - 32', waistCm: '76 - 81', hipIn: '40 - 42', hipCm: '102 - 107' },
    { size: 'XL', us: '16', uk: '20', eu: '48', bustIn: '41 - 43', bustCm: '104 - 109', waistIn: '33 - 35', waistCm: '84 - 89', hipIn: '43 - 45', hipCm: '109 - 114' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-neutral-950/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative min-h-screen flex items-center justify-center p-4 z-50">
        <div className="bg-[#faf9f6] w-full max-w-2xl shadow-2xl border border-neutral-200 p-6 sm:p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-900"
            aria-label="Close size guide"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-neutral-900">
            <Ruler className="w-5 h-5" />
            <h2 className="font-serif-luxury text-2xl font-medium tracking-wide">
              Bespoke Sizing & Measurements
            </h2>
          </div>
          <p className="mt-1 text-xs text-neutral-500">
            All garments are engineered with standard European architectural proportioning.
          </p>

          {/* Unit Toggle */}
          <div className="mt-6 flex items-center justify-between border-b border-neutral-200 pb-3">
            <span className="text-xs uppercase tracking-wider text-neutral-700 font-medium">
              Standard Apparel Matrix
            </span>
            <div className="flex items-center gap-1 bg-neutral-200 p-0.5">
              <button
                onClick={() => setUnit('in')}
                className={`px-3 py-1 text-xs font-mono font-medium transition-colors ${
                  unit === 'in' ? 'bg-white text-neutral-900 shadow-2xs' : 'text-neutral-600'
                }`}
              >
                Inches
              </button>
              <button
                onClick={() => setUnit('cm')}
                className={`px-3 py-1 text-xs font-mono font-medium transition-colors ${
                  unit === 'cm' ? 'bg-white text-neutral-900 shadow-2xs' : 'text-neutral-600'
                }`}
              >
                Centimeters
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-neutral-200 text-neutral-500 uppercase tracking-wider font-mono">
                  <th className="py-2.5 px-3">Size</th>
                  <th className="py-2.5 px-3">US</th>
                  <th className="py-2.5 px-3">UK</th>
                  <th className="py-2.5 px-3">EU</th>
                  <th className="py-2.5 px-3">Bust ({unit})</th>
                  <th className="py-2.5 px-3">Waist ({unit})</th>
                  <th className="py-2.5 px-3">Hips ({unit})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 font-mono text-neutral-800 tabular-nums">
                {womenData.map((row) => (
                  <tr key={row.size} className="hover:bg-neutral-100/50">
                    <td className="py-3 px-3 font-semibold text-neutral-950 font-sans">
                      {row.size}
                    </td>
                    <td className="py-3 px-3">{row.us}</td>
                    <td className="py-3 px-3">{row.uk}</td>
                    <td className="py-3 px-3">{row.eu}</td>
                    <td className="py-3 px-3">{unit === 'in' ? row.bustIn : row.bustCm}</td>
                    <td className="py-3 px-3">{unit === 'in' ? row.waistIn : row.waistCm}</td>
                    <td className="py-3 px-3">{unit === 'in' ? row.hipIn : row.hipCm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-4 bg-neutral-100 text-xs text-neutral-600 leading-relaxed">
            <strong>How to measure:</strong> For the most precise fit, take measurements over undergarments with a flexible tape held comfortably taut without indentation.
          </div>
        </div>
      </div>
    </div>
  );
};
