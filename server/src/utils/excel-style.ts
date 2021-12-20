const STYLE = {
    generalHeader: {
      alignment: {
        horizontal: "center",
      },
    },
  };

export const getSpecification = (displayName: string, width) => {
    return {
      width,
      displayName,
      headerStyle: STYLE.generalHeader,
    };
  };
