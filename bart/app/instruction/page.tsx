'use client';
import { useRouter } from 'next/navigation';
import { AuthDisplay } from '../auth/authDisplay';
import { Instruction } from './instruction';

//balloon analogue risk taskの説明ページ
export default function InstructionPage() {
  const router = useRouter();
  return (
    <div className="bg-gray-100 relative h-screen">
      <div className="absolute inset-0 md:mx-20 lg:mt-10">
        <AuthDisplay />
      </div>
      <div className="absolute inset-14 lg:mx-32">
        <div className="h-full flex flex-col items-center justify-center">
          <div>
            <Instruction />
          </div>

          <div className="p-8">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              onClick={() => router.push('/MainGame')}
            >
              ゲーム開始
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
