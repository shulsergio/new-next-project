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
  return (
    <div>
      <ButtonBox
        option={"button"}
        onClick={onPreviousClick}
        disabled={!hasPreviousPage}
      >
        &larr; Назад
      </ButtonBox>
      <ButtonBox
        option={"button"}
        onClick={onNextClick}
        disabled={!hasNextPage}
      >
        Вперёд &rarr;
      </ButtonBox>
    </div>
  );
}
