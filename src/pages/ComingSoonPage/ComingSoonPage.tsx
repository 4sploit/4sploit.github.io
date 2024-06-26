import { FC } from "react";
import { ComingSoonPageProps, defaultProps } from "./ComingSoonPage.props";
import { StyledComingSoonPage } from "./ComingSoonPage.style";
import { Box } from "@mui/material";
import endlessCon from "assets/images/endless-constellation.svg";
import { withPageMetadata } from "common/hocs";
import { metadata } from "./ComingSoonPage.metadata";

const ComingSoonPage: FC<ComingSoonPageProps> = (
  props: ComingSoonPageProps,
) => {
  return (
    <>
      <StyledComingSoonPage {...props}>
        <Box
          display={"flex"}
          sx={{
            backgroundImage: `url(${endlessCon})`,
            height: "100vh",
            width: "100vw",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}>
          <Box
            sx={{
              fontSize: "5vh",
              color: "white",
              fontWeight: "bold",
            }}>
            Coming Soon
          </Box>
        </Box>
      </StyledComingSoonPage>
    </>
  );
};

ComingSoonPage.defaultProps = defaultProps;

export default withPageMetadata(ComingSoonPage, metadata);
