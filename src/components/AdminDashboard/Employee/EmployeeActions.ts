export const handleSort = (key, sortConfig, setSortConfig, data, setData) => {
    const direction = sortConfig?.key === key && sortConfig?.direction === 'ascending' ? 'descending' : 'ascending';
    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
      return 0;
    });
  
    setSortConfig({ key, direction });
    setData(sortedData);
  };
  