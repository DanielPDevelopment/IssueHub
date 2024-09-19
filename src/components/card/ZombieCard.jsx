import Card from 'components/card';
import PropTypes from 'prop-types';
import useKeyDown from 'hooks/useKeyDown';

const ZombieCard = ({
  title,
  language,
  description,
  image,
  clickAction,
  extra,
}) => (
  <Card
    extra={extra}
  >
    <div
      className="h-full w-full hover:bg-orange-0/80 hover:cursor-pointer rounded-xl p-1"
      onClick={clickAction}
      onKeyDown={(e) => useKeyDown(e, 'Enter', [clickAction])}
      role="button"
      tabIndex={0}
    >
      <div className="relative w-full">
        <img
          src={image}
          className="mb-1 h-full w-full rounded-xl 3xl:h-full 3xl:w-full"
          alt=""
        />
      </div>
      <div className="flex items-center justify-between px-1 w-full">
        <div className="mb-1">
          <span className="text-md font-bold text-white">{title}</span>
          <span className=" text-xs text-green-400 font-bold px-1">
            {language}
          </span>
          <p className="text-xs text-gray-600">
            {(description && description.length > 99) ? `${description.substring(0, 100).trim()}...` : description}
          </p>
        </div>
      </div>
    </div>
  </Card>
);

ZombieCard.propTypes = {
  title: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  description: PropTypes.string,
  image: PropTypes.node.isRequired,
  clickAction: PropTypes.func.isRequired,
  extra: PropTypes.string,
};

ZombieCard.defaultProps = {
  description: '',
  extra: '',
};

export default ZombieCard;
