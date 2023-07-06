import React, { useEffect } from 'react';
import { useAppContext } from './ContextProvider/ContextProvider';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { fetchData } from 'services/api';

// {
//   gallery = [],
//   hits = 0,
//   modalIndex = '-1',
//   loading = false,
//   loadingMore = false,
//   query = 'landscape blues',
//   page = 0,
//   scroll = 0,
// }
export const App = () => {
  const {
    gallery,
    setGallery,
    hits,
    setHits,
    modalIndex,
    loading,
    setLoading,
    loadingMore,
    setLoadingMore,
    query,
    page,
    setPage,
    scroll,
    setScroll,
    error,
    setError,
  } = useAppContext();

  const convertResponseIntoGallery = response => {
    if (!response.data || !response.data.hits) return [];
    return response.data.hits.map(hit => ({
      id: hit.id,
      miniature: hit.webformatURL,
      url: hit.largeImageURL,
      tags: hit.tags,
    }));
  };

  useEffect(() => {
    setLoadingMore(true);

    const componentDidCatch = error => {
      console.log(error);
      setError(error);
      setLoading(false);
    };
    const fetchGallery = async () => {
      const response = await fetchData(query, page, componentDidCatch);
      if (page === 1) {
        setGallery(convertResponseIntoGallery(response));
      } else {
        setGallery(prev => [...prev, ...convertResponseIntoGallery(response)]);
      }
      setHits(Number(response.data.totalHits) || 0);
      setLoadingMore(false);
      setLoading(false);
      return true;
    };
    try {
      fetchGallery();
    } finally {
      if (page > 1) {
        window.scrollTo(0, scroll);
      }
    }
  }, [
    page,
    query,
    scroll,
    setGallery,
    setError,
    setHits,
    setLoading,
    setLoadingMore,
  ]);

  const saveScrollPosition = () => {
    const y = Math.floor(
      document.documentElement.scrollTop || document.body.scrollTop
    );
    setScroll(y);
  };

  const newGallery = () => {
    setError('');
    setHits(0);
    setLoading(true);
    if (gallery !== []) setGallery([]);
    if (page !== 1) setPage(1);
  };
  const loadMoreGallery = () => {
    saveScrollPosition();
    setPage(prev => 1 + prev);
  };

  return (
    <div className="App">
      {loading ? <Loader /> : ''}
      <Searchbar searchHandle={newGallery} />
      {modalIndex > -1 ? <Modal {...gallery[modalIndex]} /> : ''}
      {!loading && gallery.length > 0 ? (
        <ImageGallery />
      ) : error ? (
        ''
      ) : (
        <span className="Message">No search results.</span>
      )}
      {error ? <span className="Message">{error.message}</span> : ''}
      {hits > Math.max(0, gallery.length) ? (
        loadingMore ? (
          <Loader small={true} />
        ) : (
          <Button txt="Load more" onClick={loadMoreGallery} />
        )
      ) : (
        ''
      )}
    </div>
  );
};
