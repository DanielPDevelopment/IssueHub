import PropTypes from 'prop-types';

const Card = (props) => {
  const { extra, children } = props;
  return (
    <div
      className={`!z-5 relative flex flex-col rounded-[20px] bg-clip-border bg-darkMainDefault text-white shadow-none ${extra}`}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  extra: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Card.defaultProps = {
  extra: '',
};

export default Card;
