import PropTypes from 'prop-types';



export const Letter = ({className, style, letter}) => { 
    return <span className={className} style={style}>{letter}</span>
}

Letter.propTypes = {
    className: PropTypes.string, 
    style: PropTypes.object,
    letter: PropTypes.string,
};