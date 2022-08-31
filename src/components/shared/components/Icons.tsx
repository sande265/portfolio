import PropTypes from 'prop-types';
import {
  IconLoader,
  IconLogo,
  InstagramIcon,
  GitHubIcon,
  LinkedinIcon,
  TwitterIcon,
  ForkIcon,
  StarIcon,
  ExternalIcon,
} from '../icons';

interface IconProps {
  name: string;
}

const Icon: React.FC<IconProps> = ({ name }) => {
  switch (name?.toLowerCase()) {
    case 'loader':
      return <IconLoader />;
    case 'logo':
      return <IconLogo />;
    case 'instagram':
      return <InstagramIcon />;
    case 'linkedin':
      return <LinkedinIcon />;
    case 'github':
      return <GitHubIcon />;
    case 'twitter':
      return <TwitterIcon />;
    case 'fork':
      return <ForkIcon />;
    case 'star':
      return <StarIcon />;
    case 'external':
      return <ExternalIcon />;
    default:
      return <></>;
  }
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
};

export { Icon };
export default Icon;
