'use client'; // 명시하면, 해당 파일의 모든 코드가 클라이언트(브라우저)에서 실행되야함을 명시
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoonIcon, SunIcon, SunMoon } from 'lucide-react';

const ModeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // mounted가 false인 경우, 서버에서 렌더링된 HTML과 클라이언트에서 렌더링된 HTML이 일치하지 않아서 hydration 오류가 발생할 수 있음
  if (!mounted) {
    //서버 키면 이 로그 한번은 무적선 실행된다.
    //이유: React는 컴포넌트의 초기 렌더링을 마치고
    //즉각적인 함수(동기함수)가 먼저 시행되고 등록만되고 useEffect 콜백을 호출하여 setMounted 변경시키고 변경된것을 감지후 랜더링한다다
    console.log('마운트가 안되어서 모드 토글을 렌더링하지 않습니다.');
    return null;
  }

  // asChild 속성은 DropdownMenuTrigger가 Button을 직접 생성안함 자식인 <Button> 컴포넌트에게 그대로 넘겨주므로써 자식이 직접 트리거 역할 
  //저걸 안쓰면 <button><button>버튼</button></button> 비효율적인 중첩이 발생함
  return  <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          {theme === 'system' ? (<SunMoon />) : theme === 'dark' ? (<MoonIcon />) : (<SunIcon />)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={theme === 'system'}
          onClick={() => setTheme('system')}
        >
          System
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={theme === 'light'}
          onClick={() => setTheme('light')}
        >
          Light
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={theme === 'dark'}
          onClick={() => setTheme('dark')}
        >
          Dark
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
}
 
export default ModeToggle;