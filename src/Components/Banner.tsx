import styled from "styled-components";
import { motion } from "framer-motion";

interface BannerProps {
  bgPhoto: string;
  title: string;
  overview: string;
}

const BannerWrapper = styled(motion.div)<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const BannerTitle = styled(motion.h3)`
  font-size: 15px;
  color: #acacac;
`;

const Title = styled(motion.h2)`
  font-size: 68px;
  margin-bottom: 20px;
`;

const Overview = styled(motion.p)`
  font-size: 20px;
  width: 50%;
`;

const bannerVariants = {
  start: { opacity: 0 },
  end: {
    opacity: 1,
    transition: {
      duration: 0.7,
      delayChildren: 0.4,
      staggerChildren: 0.1,
    },
  },
};

const bannerDetailVar = {
  start: {
    opacity: 0,
    y: 50,
  },
  end: {
    opacity: 1,
    y: 0,
  },
};

function Banner({ bgPhoto, title, overview }: BannerProps) {
  return (
    <BannerWrapper
      bgPhoto={bgPhoto}
      variants={bannerVariants}
      initial="start"
      animate="end"
    >
      <BannerTitle variants={bannerDetailVar}>Popular</BannerTitle>
      <Title variants={bannerDetailVar}>{title}</Title>
      <Overview variants={bannerDetailVar}>{overview}</Overview>
    </BannerWrapper>
  );
}

export default Banner;
