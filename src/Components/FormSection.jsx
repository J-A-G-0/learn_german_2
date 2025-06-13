import React from "react";

/* 
e.g. inputName = "ich":
    correct-answer id = "correct-answer-ich",
    input id = "input-ich",
    input name = "ich",
    label = "ich"

    If written out it would be:
    <div className="form-section">
        <div class="input-container-div">
            <div class="correct-answer" id="correct-answer-ich">Incorrect</div>
            <input type="text" id="input-ich" className="inputArea" name="ich" autocomplete="off"/>
            <label htmlFor="ich">ich</label>
        </div>
    </div>
*/

const FormSection = ( {inputName, label, onFocus} ) => {
    return (
        <div className="form-section">
            <div className="input-container-div">
                <div className="correct-answer" id={`correct-answer-${inputName}`}>Incorrect</div>
                <input type="text" id={`input-${inputName}`} className="inputArea" name={inputName} autoComplete="off" onFocus={() => onFocus(inputName)} />
                <label className="pronounLabel" htmlFor={inputName}>{label}</label>
            </div>
        </div>
    );
};

export default FormSection;
