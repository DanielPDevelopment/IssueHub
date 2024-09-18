import React from 'react';

function useSearchToggle(event) {
  const [searchOpen, setSearchOpen] = React.useState(false);

  const handleKeyPress = (ev = event) => {
    if (ev.ctrlKey && ev.shiftKey && ev.key === 'S') {
      setSearchOpen((prev) => !prev);
    }
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      // Remove the event listener when the component unmounts
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  React.useEffect(() => {
    if (searchOpen) {
      const searchInput = document.getElementById('search');
      if (searchInput) {
        searchInput.focus();
      }
    }
    console.log('search should be open');
  }, [searchOpen]);
  return [searchOpen, setSearchOpen, handleKeyPress];
}

export default useSearchToggle;
