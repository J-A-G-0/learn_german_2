import React from "react";

/* New file to contain the form sections

e.g. inputName = "ich":
    correct-answer id = "correct-answer-ich",
    input id = "input-ich",
    input name = "ich",
    label = "ich"

    If writtenn out it would be:
    <div className="form-section">
        <div class="input-container">
            <div class="correct-answer" id="correct-answer-ich">Incorrect</div>
            <input type="text" id="input-ich" className="floatLabel" name="ich" autocomplete="off"/>
            <label htmlFor="ich">ich</label>
        </div>
    </div>

*/

const FormSection = ( {inputName, label, onFocus} ) => {
    return (
        <div className="form-section">
            <div class="input-container">
                <div class="correct-answer" id={`correct-answer-${inputName}`}>Incorrect</div>
                <input type="text" id={`input-${inputName}`} className="floatLabel" name={inputName} autocomplete="off" onFocus={() => onFocus(inputName)} />
                <label htmlFor={inputName}>{label}</label>
            </div>
        </div>
    );
};

export default FormSection;
