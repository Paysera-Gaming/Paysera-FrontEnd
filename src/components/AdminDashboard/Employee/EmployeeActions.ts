export const handleSort = (key: string | number, sortConfig: { key: any; direction: string; }, setSortConfig: (arg0: { key: any; direction: string; }) => void, data: any, setData: (arg0: any[]) => void) => {
  const direction = sortConfig?.key === key && sortConfig?.direction === 'ascending' ? 'descending' : 'ascending';
  const sortedData = [...data].sort((a, b) => {
    if (a[key].toLowerCase() < b[key].toLowerCase()) return direction === 'ascending' ? -1 : 1;
    if (a[key].toLowerCase() > b[key].toLowerCase()) return direction === 'ascending' ? 1 : -1;
    return 0;
  });

  setSortConfig({ key, direction });
  setData(sortedData);
};
