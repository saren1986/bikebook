
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  title: { textAlign: 'center' },
  bikeItemHeader: {
    borderBottom: '1px solid #f5f5f5',
    paddingBottom: '10px',
    justifyContent: 'center',
  },
  topInfo: { textAlign: 'right' },
  bikeItemView: { marginBottom: '15px' },
}));

export default useStyles;
