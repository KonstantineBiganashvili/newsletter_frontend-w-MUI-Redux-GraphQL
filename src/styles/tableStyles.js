import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  tableContainer: {
    margin: 'auto',
    width: '80% !important',
    marginTop: '20px',
    marginBottom: '120px',
  },
  tableCell: { maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis' },
});

export default useStyles;
