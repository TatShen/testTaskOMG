import PropTypes from 'prop-types';

export const Letter = ({className, style, letter}) => {
    return <div className={className} style={style} >{letter?.toUpperCase()}</div>
}

Letter.propTypes = {
    className: PropTypes.string, 
    style: PropTypes.object,
    letter: PropTypes.string,
};