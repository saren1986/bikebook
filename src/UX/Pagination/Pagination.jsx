import React from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const useStyles = makeStyles((theme) => ({
  paginationWrapper: {
    '& ul.pagination': {
      listStyle: 'none',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      padding: 0,
      '& li': {
        '& > a': {
          outline: 'none',
          width: 40,
          height: 40,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
        },
        '&:not(.disabled):hover': {
          color: theme.palette.primary.main,
        },
        '&.active': {
          fontWeight: 'bold',
          color: theme.palette.primary.main,
        },
      },
      '& li.previous, & li.next': {
        '&.disabled': {
          opacity: 0.5,
          '& > a': {
            cursor: 'default',
          },
        },
      },
    },
  },
}));

const Pagination = ({ elemenstLength, perPage, pageClick }) => {
  const classes = useStyles();
  const countPages = Math.ceil(elemenstLength / perPage);

  const handlePageClick = (data) => {
    pageClick(data.selected);
    window.scrollTo(0, 0);
  };

  return (
    <div className={classes.paginationWrapper}>
      <ReactPaginate
        previousLabel={(
          <ArrowBackIosIcon />
        )}
        nextLabel={(
          <ArrowForwardIosIcon />
        )}
        breakLabel={(
          <MoreHorizIcon />
        )}
        breakClassName="break-me"
        pageCount={countPages}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName="pagination"
        pageClassName="pag-item"
        subContainerClassName="pages pagination"
        activeClassName="active"
      />
    </div>
  );
};

Pagination.propTypes = {
  elemenstLength: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  pageClick: PropTypes.func.isRequired,
};

export default Pagination;
