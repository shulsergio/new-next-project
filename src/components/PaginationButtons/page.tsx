import ButtonBox from "../ButtonBox/ButtonBox";

interface PaginationButtonsProps {
  onPreviousClick: () => void;
  onNextClick: () => void;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export default function PaginationButtons({
  onPreviousClick,
  onNextClick,
  hasPreviousPage,
  hasNextPage,
}: PaginationButtonsProps) {
  console.log("*** PaginationButtons hasPreviousPage:", hasPreviousPage);

  return (
    <div>
      {hasPreviousPage && (
        <ButtonBox option={"button"} onClick={onPreviousClick}>
          &larr; Back
        </ButtonBox>
      )}
      {hasNextPage && (
        <ButtonBox
          option={"button"}
          onClick={onNextClick}
          disabled={!hasNextPage}
        >
          Next &rarr;
        </ButtonBox>
      )}
    </div>
  );
}
