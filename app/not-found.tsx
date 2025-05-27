'use client';
import { APP_NAME } from '@/lib/constants';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen '>
      <Image
        priority={true} // 이미지는 페이지 로딩 시 즉시 로드되도록(UI 최적화)
        src='/images/logo.svg'
        width={48}
        height={48}
        alt={`${APP_NAME} logo`}
      />
      <div className='p-6 rounded-lg shadow-md w-1/3 text-center'>
        <h1 className='text-3xl font-bold mb-4'>요청 하신 페이지는 찿을수 없습니다</h1>
        <p className='text-destructive'>잘못 요청된 페이지 입니다</p>
        <Button
          variant='outline'
          className='mt-4 ml-2'
          onClick={() => (window.location.href = '/')}
        >
          Back to home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;