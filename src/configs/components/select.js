import chroma from 'chroma-js';

const innerInputPadding = "7px";

const value = {
  fontFamily: "Segoe UI",
  fontStyle: "normal",
  fontSize: '14px',
  color: '#333',
}
const noValue = {
  fontFamily: "Segoe UI",
  fontStyle: "normal",
  fontSize: '14px',
  color: '#777',
}
const noValueMandatory = {
  fontFamily: "Segoe UI",
  fontStyle: "normal",
  fontSize: '14px',
}

export const pickSelectStyleWithRequired = (defaultStyles, requiredStyles, required) => {
  if (required) {
    return pickSelectStyle([...defaultStyles, ...requiredStyles])
  }
  return pickSelectStyle(defaultStyles)
}

export const pickSelectStyle = (wantedAttributes = []) => {
  const invisible = wantedAttributes.includes('invisible');
  const noArrow = wantedAttributes.includes('noArrow');
  const noPadding = wantedAttributes.includes('noPadding');
  const colored = wantedAttributes.includes('colored');
  const fullColor = wantedAttributes.includes('fullColor');
  const required = wantedAttributes.includes('required');
  const highlight = wantedAttributes.includes('highlight');
  const blueFont = wantedAttributes.includes('blueFont');
  const bordered = wantedAttributes.includes('bordered');
  const segoe = wantedAttributes.includes('segoe');
  const right = wantedAttributes.includes('right');
  const bolder = wantedAttributes.includes('bolder');
  const basic = wantedAttributes.includes('basic');
  const flex = wantedAttributes.includes('flex');
  const size12 = wantedAttributes.includes('size12');
  const size14 = wantedAttributes.includes('size14');
  const size16 = wantedAttributes.includes('size16');
  const inputSize = wantedAttributes.includes('inputSize');

  return {
    container: (base) => {
      let newStyle = {
        ...base,
      }
      if (flex) {
        newStyle = {
          ...newStyle,
          flex: 1,
        }
      }
      return newStyle;
    },
    control: (base, state) => {
      let newStyle = {
        ...base,
        minHeight: 30,
        borderRadius: 0,
        borderWidth: 0,
        paddingLeft: innerInputPadding,
      };
      if (invisible) {
        newStyle = {
          ...newStyle,
          backgroundColor: state.isFocused ? 'white' : 'inherit',
        }
      } else {
        newStyle = {
          ...newStyle,
          backgroundColor: 'white',
        }
      }

      const data = state.getValue();
      if (fullColor && data[0].color) {
        newStyle = {
          ...newStyle,
          backgroundColor: data[0].color
        }
      }

      if (noArrow) {
        newStyle = {
          ...newStyle,
          minHeight: 32,
        }
      }

      if (
        required &&
        (state.getValue().length === 0 || state.getValue().some((item) => item.value === null))
      ) {
        newStyle = {
          ...newStyle,
          borderColor: 'red',
          borderWidth: 1,
          color: 'red',
        }
      }

      if (noPadding) {
        newStyle = {
          ...newStyle,
          //  borderWidth: base.borderWidth,
          paddingLeft: "0px !important",
        }
      }
      if (blueFont) {
        newStyle = {
          ...newStyle,
          fontFamily: "Segoe UI",
          fontStyle: "normal",
          fontWeight: 350,
          fontSize: "14px",
          lineHeight: "20px",
          letterSpacing: "0.5px",
          color: "#0078D4",
        }
      }

      if (size12) {
        newStyle = {
          ...newStyle,
          fontSize: "12px",
        }
      }

      if (size14) {
        newStyle = {
          ...newStyle,
          fontSize: "14px",
        }
      }

      if (size16) {
        newStyle = {
          ...newStyle,
          fontSize: "16px",
        }
      }

      if (inputSize) {
        newStyle = {
          ...newStyle,
          minHeight: 30,
        }
      }

      if (segoe) {
        newStyle = {
          ...newStyle,
          fontFamily: "Segoe UI",
          color: "#0078D7 !important",
        }
      }

      if (bordered) {
        newStyle = {
          ...newStyle,
          borderWidth: 1,
          borderRadius: 1
        }
      }
      return newStyle;
    },
    dropdownIndicator: (base) => {
      let newStyle = {
        ...base,
        padding: 4,
      }
      if (noArrow) {
        newStyle = {
          ...newStyle,
          color: "transparent",
          width: 0,
          padding: 0,
        }
      }
      return newStyle;
    },
    clearIndicator: (base) => {
      return {
        ...base,
        padding: 4,
      }
    },
    multiValue: (base, aditionalParams) => {
      const {
        data
      } = aditionalParams;
      let newStyle = {
        ...base,
        borderRadius: 0,
      }
      if (highlight) {
        newStyle = {
          ...newStyle,
          marginLeft: 0,
          marginRight: 4,
        };
      }
      if (blueFont) {
        newStyle = {
          ...newStyle,
          color: "#0078D4",
        };
      }

      if (segoe) {
        newStyle = {
          ...newStyle,
          fontFamily: "Segoe UI",
          color: "#0078D7 !important",
        }
      }

      if (colored && data.color) {
        const color = chroma(data.color);
        newStyle = {
          ...newStyle,
          color: '#FFF',
          padding: '0px 5px',
          backgroundColor: color.alpha(0.1).css(),
        }
      }
      return newStyle;
    },
    multiValueLabel: (base, aditionalParams) => {
      const {
        data
      } = aditionalParams;
      let newStyle = {
        ...base,
      }
      if (colored && data.color) {
        newStyle = {
          ...newStyle,
          color: data.color,
        }
      }
      return newStyle;
    },
    multiValueRemove: (base, aditionalParams) => {
      const {
        data
      } = aditionalParams;
      let newStyle = {
        ...base,
        color: 'black',
        backgroundColor: "#F2F1F1",
        ':hover': {
          backgroundColor: "rgba(0,0,0,0.5)",
          color: 'white',
        }
      }
      if (highlight) {
        newStyle = {
          ...newStyle,
          margin: 0,
        }
      }
      if (colored && data.color) {
        newStyle = {
          ...newStyle,
          color: data.color,
          ':hover': {
            backgroundColor: data.color,
            color: 'white',
          },
        }
      }
      return newStyle;
    },
    valueContainer: (base) => {
      let newStyle = {
        ...base,
        padding: '0px 5px',
        borderRadius: 0,
        paddingLeft: 0, //all selects no left padding
      }
      if (!colored) {
        newStyle = {
          ...newStyle,
          ...value,
        }
      }
      if (invisible || noArrow || colored || highlight || blueFont || segoe) {
        newStyle = {
          ...newStyle,
          padding: '0px 6px',
        }
      }
      if (size12) {
        newStyle = {
          ...newStyle,
          fontSize: "12px",
        }
      }

      if (size14) {
        newStyle = {
          ...newStyle,
          fontSize: "14px",
        }
      }

      if (size16) {
        newStyle = {
          ...newStyle,
          fontSize: "16px",
        }
      }

      if (highlight) {
        newStyle = {
          ...newStyle,
          margin: 0,
        }
      }
      return newStyle;
    },
    input: (base) => {
      let newStyle = {
        ...base,
        margin: 0,
        padding: 0,
        borderRadius: 0
      }
      if (invisible || colored || segoe) {
        newStyle = {
          ...newStyle,
          backgroundColor: "inherit",
        }
      }
      return newStyle;
    },
    indicatorSeparator: (base) => {
      let newStyle = {
        ...base,
        width: 0,
      }

      return newStyle;
    },
    placeholder: (base) => {
      let newStyle = {
        ...base,
      }
      if (invisible || noArrow) {
        newStyle = {
          ...newStyle,
          ...noValue
        }
      } else {
        newStyle = {
          ...newStyle,
          ...noValueMandatory
        }
      }
      if (blueFont) {
        newStyle = {
          ...newStyle,
          color: "#0078D4",
          fontSize: "14px",
        }
      }

      if (size12) {
        newStyle = {
          ...newStyle,
          fontSize: "12px",
        }
      }

      if (size14) {
        newStyle = {
          ...newStyle,
          fontSize: "14px",
        }
      }

      if (size16) {
        newStyle = {
          ...newStyle,
          fontSize: "16px",
        }
      }

      if (segoe) {
        newStyle = {
          ...newStyle,
          fontFamily: "Segoe UI",
          color: "#0078D7 !important",
        }
      }
      if (required) {
        newStyle = {
          ...newStyle,
          color: "red",
        }
      }
      return newStyle;
    },
    menu: (base) => {
      let newStyle = {
        ...base,
        zIndex: 50,
      }

      return newStyle;
    },
    option: (base, aditionalParams) => {
      const {
        data,
        isDisabled,
        isFocused,
        isSelected
      } = aditionalParams;
      let newStyle = {
        ...base
      }
      if (colored && data.color) {
        const color = chroma(data.color);
        newStyle = {
          ...newStyle,
          backgroundColor: (
            isSelected ?
            data.color :
            (
              isFocused ?
              color.alpha(0.1).css() :
              null
            )
          ),
          color: (
            isSelected ?
            (
              chroma.contrast(color, 'white') > 2 ?
              'white' :
              'black'
            ) :
            data.color
          ),

          ':active': {
            ...newStyle[':active'],
            backgroundColor: !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
          },
        };
      }
      if (right) {
        newStyle = {
          ...newStyle,
          textAlign: 'right',
        }
      }
      if (basic) {
        newStyle = {
          ...newStyle,
          padding: '2px 5px',
        }
      }

      if (bolder) {
        newStyle = {
          ...newStyle,
          fontWeight: 'bolder',
        }
      }
      return newStyle;
    },
    singleValue: (base, aditionalParams) => {
      const {
        data
      } = aditionalParams;
      let newStyle = {
        ...base,
      };
      if (blueFont) {
        newStyle = {
          ...newStyle,
          color: "#0078D4",
        }
      }
      if (segoe) {
        newStyle = {
          ...newStyle,
          fontFamily: "Segoe UI",
          color: "#0078D7 !important",
        }
      }
      if (colored && data.color) {
        newStyle = {
          ...newStyle,
          color: '#FFF',
          padding: '0px 5px',
          minHeight: '19px', //potencially breaking
          backgroundColor: data.color
        };
      }
      if (right) {
        newStyle = {
          ...newStyle,
          textAlign: 'right',
          width: '100%',
          paddingRight: 5,
        }
      }
      if (bolder) {
        newStyle = {
          ...newStyle,
          fontWeight: 'bolder',
        }
      }
      return newStyle;
    },
  }
}

export const sidebarSelectStyle = {
  singleValue: (provided) => {
    return {
      ...provided,
      marginLeft: 0,
      marginRight: 0,
      color: "#212121",
      backgroundColor: "transparent",
    };
  },
  valueContainer: base => ({
    ...base,
    backgroundColor: "#f2f1f1"
  }),
  indicatorSeparator: (provided) => {
    return {
      ...provided,
      width: 0,
    };
  },
  control: (provided) => {
    return {
      ...provided,
      background: "#F9F9F9",
      backgroundColor: "transparent",
      borderRadius: 0,
      borderWidth: "0",
      height: 40,
      padding: 0
    };
  },
  option: (styles) => {
    return {
      ...styles,
      backgroundColor: "cyan",
    };
  },
  input: (provided) => {
    return {
      ...provided,
      marginLeft: 30,
    };
  },
  placeholder: (provided) => {
    return {
      ...provided,
      marginLeft: 30
    };
  },
};

export const sidebarSelectStyleNoIcon = {
  singleValue: (provided) => {
    return {
      ...provided,
      marginLeft: 7,
      color: "#212121",
      backgroundColor: "transparent",
    };
  },
  indicatorSeparator: (provided) => {
    return {
      ...provided,
      width: 0,
    };
  },
  control: (provided) => {
    return {
      ...provided,
      backgroundColor: "transparent",
      borderRadius: 0,
      borderWidth: "0",
      height: 40,
      padding: 0
    };
  },
  input: (provided) => {
    return {
      ...provided,
      marginLeft: 7,
      backgroundColor: "transparent",
    };
  },
  placeholder: (provided) => {
    return {
      ...provided,
      marginLeft: 7
    };
  },
};

export const CRMMertelSelectStyle = {
  control: base => ({
    ...base,
    minHeight: 30,
    backgroundColor: 'white',
    borderRadius: 4.13,
    fontWeight: 600,
    fontSize: 11,
    alignItems: "center",
  }),
  dropdownIndicator: base => ({
    ...base,
    padding: 4,
  }),
  clearIndicator: base => ({
    ...base,
    padding: 4,
  }),
  multiValue: base => ({
    ...base,
    backgroundColor: 'white',
    borderRadius: 0,
  }),
  valueContainer: base => ({
    ...base,
    padding: '0px 6px',
    borderRadius: 0,
  }),
  input: base => ({
    ...base,
    margin: 0,
    padding: 0,
    backgroundColor: 'white',
    borderRadius: 0,
  }),
  indicatorSeparator: base => ({
    ...base,
    width: 0,
  }),

};