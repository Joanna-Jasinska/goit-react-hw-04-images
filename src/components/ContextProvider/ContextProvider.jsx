import { createContext, useContext, useState } from 'react';
import { PropTypes } from 'prop-types';

const AppContext = createContext();
// {
//   gallery = [],
//   hits = 0,
//   modalIndex = '-1',
//   loading = false,
//   loadingMore = false,
//   query = 'landscape blues',
//   page = 0,
//   scroll = 0,
//   error = '';
// }
export const useAppContext = () => useContext(AppContext);
export const ContextProvider = props => {
  const [gallery, setGallery] = useState(props.gallery || []);
  const [hits, setHits] = useState(props.hits || 0);
  const [modalIndex, setModalIndex] = useState(props.modalIndex || -1);
  const [loading, setLoading] = useState(props.loading || false);
  const [loadingMore, setLoadingMore] = useState(props.loadingMore || false);
  const [query, setQuery] = useState(props.query || 'landscape blues');
  const [page, setPage] = useState(props.page || 1);
  const [scroll, setScroll] = useState(props.scroll || 0);
  const [error, setError] = useState(props.error || '');
  const contextValue = {
    gallery,
    setGallery,
    hits,
    setHits,
    modalIndex,
    setModalIndex,
    loading,
    setLoading,
    loadingMore,
    setLoadingMore,
    query,
    setQuery,
    page,
    setPage,
    scroll,
    setScroll,
    error,
    setError,
  };
  return (
    <AppContext.Provider value={contextValue}>
      {props.children || 'no children'}
    </AppContext.Provider>
  );
};

ContextProvider.propTypes = {
  gallery: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      url: PropTypes.string,
      miniature: PropTypes.string,
      alt: PropTypes.string,
    }).isRequired
  ),
  modalIndex: PropTypes.number,
  loading: PropTypes.bool,
  loadingMore: PropTypes.bool,
  query: PropTypes.string,
  hits: PropTypes.number,
  page: PropTypes.number,
  scroll: PropTypes.number,
  error: PropTypes.string,
};
