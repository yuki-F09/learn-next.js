'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';




export default function Search({ placeholder }: { placeholder: string }) {
  
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  
  const handleSearch = useDebouncedCallback((term) => {
  
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    // おそらく検索をかけ直した時点で（inputに入力がされた時点で）1ページ目から表示させたいから

  if (term) {
    params.set('query', term);
  } else {
    params.delete('query');
  }
   replace(`${pathname}?${params.toString()}`);
   //　多分シンプルに引数の文字列に塗り替えているだけ。?はinvoices?query=... のやつで
   // 理解できていないのはpathnameがqueryの部分が削除されたものなのか
   // pathnameはパス名までしか取得せず、クエリパラメータは取得しないって
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}

      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
