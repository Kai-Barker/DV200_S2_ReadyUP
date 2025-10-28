import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import LeftArrow from "../assets/images/_.svg";
import RightArrow from "../assets/images/_1.svg";

export default function VariantButtonGroup({ totalPages, currentPage, onPageChange }) {
  {if (totalPages>0) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          "& > *": {
            m: 1,
          },
        }}
      >
        <ButtonGroup
          variant="outlined"
          aria-label="Basic button group"
          size="large"
        >
          <Button onClick={() => onPageChange(currentPage - 1)} className="cursor-target"
            sx={{
              fontSize: "1.2rem",
              fontFamily: "Audiowide, sans-serif",
              borderColor: "#EDE4F1",
              color: "#EDE4F1",
              borderRadius: "15px",
              border: "0.15rem solid",
            }}
          >
            <img src={LeftArrow} alt="Previous" style={{ maxWidth: "80%" }} />
          </Button>
          <Button
            sx={{
              fontSize: "1.2rem",
              fontFamily: "Audiowide, sans-serif",
              borderColor: "#EDE4F1",
              color: "#EDE4F1",
              border: "0.15rem solid",
              pointerEvents: "none",
              cursor: "default",
            }}
          >
            Page {currentPage} of {totalPages}
          </Button>
          <Button onClick={() => onPageChange(currentPage + 1)} className="cursor-target"
            sx={{
              fontSize: "1.2rem",
              fontFamily: "Audiowide, sans-serif",
              borderColor: "#EDE4F1",
              color: "#EDE4F1",
              borderRadius: "15px",
              border: "0.15rem solid",
            }}
          >
            <img src={RightArrow} alt="Next" style={{ maxWidth: "80%" }} />
          </Button>
        </ButtonGroup>
      </Box>
    );
  } else{
    return null;
  }}
}
