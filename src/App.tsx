import React, { useEffect } from 'react';
import { Outlet, Link, Route, Routes } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from './app/hooks';
import Card from './components/card/card';
import CharacterDetail from './components/detail/characterDetail';
import Header from './components/header/header';
import { characterList, endOfList, getCharactersAsync } from './features/character/characterSlice';

export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCharactersAsync());
  }, [dispatch]);
  
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="detail/:id" element={<CharacterDetail />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}

function Layout() {
  return (
    <div className="container-fluid g-0">
      <Header />
      <main className="container pt-4">
        <Outlet />
      </main>
    </div>
  );
}

function Home() {
  const statusMessages = ['Loading...', 'All characters are listed!..'];
  const dispatch = useAppDispatch();
  const info = useAppSelector(characterList)?.info;
  const status = useAppSelector(endOfList);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);

    function handleScroll() {
      if (Math.round(window.innerHeight + document.documentElement.scrollTop) !== document.documentElement.offsetHeight) return;

      if (info && info.next) {
        const page = info.next.split('=')[1];

        dispatch(getCharactersAsync(+page));
      }
    }
  }, [dispatch, info]);

  const list = useAppSelector(characterList)?.results.map(character => {
    const characterData = { id: character.id, name: character.name, image: character.image };
    return <Card data={characterData} key={characterData.id}/>;
  });

  return (
    <div className='row'>
      {list}
      <p className="text-center">{statusMessages[status]}</p>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
