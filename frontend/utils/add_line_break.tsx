export const addLineBreak = (str: string) =>
  str.split("\n").map((subStr) => {
    return (
      <>
        {subStr}
        <br />
      </>
    );
  });
