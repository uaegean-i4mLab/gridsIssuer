import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import { OutlinedInput } from "@material-ui/core";

import styles from "styles/jss/nextjs-material-kit/components/customInputStyleNew.js";

const useStyles = makeStyles(styles);

export default function CustomInput(props) {
    const classes = useStyles();
    const {
        formControlProps,
        labelText,
        id,
        labelProps,
        inputProps,
        error,
        white,
        inputRootCustomClasses,
        success,
        name,
        placeholder,
    } = props;

    const labelClasses = classNames({
        [" " + classes.labelRootError]: error,
        [" " + classes.labelRootSuccess]: success && !error,
    });
    const underlineClasses = classNames({
        [classes.underlineError]: error,
        [classes.underlineSuccess]: success && !error,
        [classes.underline]: true,
        [classes.whiteUnderline]: white,
    });
    const marginTop = classNames({
        [inputRootCustomClasses]: inputRootCustomClasses !== undefined,
    });
    const inputClasses = classNames({
        [classes.input]: true,
        [classes.whiteInput]: white,
    });
    const outlinedFormClasses = classes.outlinedFormClass;
    var formControlClasses;
    if (formControlProps !== undefined) {
        formControlClasses = classNames(
            formControlProps.className,
            classes.formControl
        );
    } else {
        formControlClasses = classes.formControl;
    }
    return (
        <div>
            {labelText !== undefined ? (
                <InputLabel
                    className={classes.labelRoot + " " + labelClasses}
                    htmlFor={id}
                    {...labelProps}
                >
                    {labelText}
                </InputLabel>
            ) : null}
        <FormControl {...formControlProps} className={formControlClasses}>

            <OutlinedInput className={outlinedFormClasses}
                classes={{
                    input: inputClasses,
                    root: marginTop,
                    disabled: classes.disabled,
                }}
                id={id}
                name={name}
                placeholder={placeholder}
                onChange={props.handleChange}
                {...inputProps}
            />
        </FormControl>
        </div>
    );
}

CustomInput.propTypes = {
    labelText: PropTypes.node,
    labelProps: PropTypes.object,
    id: PropTypes.string,
    inputProps: PropTypes.object,
    formControlProps: PropTypes.object,
    inputRootCustomClasses: PropTypes.string,
    error: PropTypes.bool,
    success: PropTypes.bool,
    white: PropTypes.bool,
};
