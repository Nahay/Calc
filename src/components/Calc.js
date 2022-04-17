import { useState, useEffect } from "react";


const Calc = ({calcType}) => {

    const [current, setCurrent] = useState(0);
    const [tbl, setTbl] = useState(new Array(10).fill(0));
    const [tblBool, setTblBool] = useState(new Array(10).fill(false));
    const [rep, setRep] = useState('');
    const [end, setEnd] = useState(false);
    const [score, setScore] = useState(0);

    useEffect (() => {

        const genNum = () => Math.floor(Math.random() * 10)+1;
        let tempTbl = [];

        if (calcType === ':') {
            for (let i = 0; i < 10; i++) {
                let ended = false;

                while (!ended) {
                    let x = genNum();
                    let y = genNum();
                    if (x % y === 0) {
                        ended = true;
                        let numbs = [x, y];
                        tempTbl.push(numbs);
                    }
                }
            }
        }
        else if (calcType === '-') {
            for (let i = 0; i < 10; i++) {
                let ended = false;

                while (!ended) {
                    let x = genNum();
                    let y = genNum();
                    if (y <= x) {
                        ended = true;
                        let numbs = [x, y];
                        tempTbl.push(numbs);
                    }
                }
            }
        }
        else {
            for (let i = 0; i < 10; i++) {
                let numbs = [genNum(), genNum()];
                tempTbl.push(numbs);
            }
        }
        
        setTbl(tempTbl);

    }, [])

    const checkAdd = (e) => {
        e.preventDefault();
        let currentRound = current;

        if (!isNaN(rep) && rep !== '') { 

            let tempBool = [...tblBool];

            let rightRep = false;

            switch(calcType) {
                case '+' :
                    rightRep = tbl[current][0] + tbl[current][1]
                    break;
                case '-' :
                    rightRep = tbl[current][0] - tbl[current][1]
                    break;
                case 'x' :
                    rightRep = tbl[current][0] * tbl[current][1]
                    break;
                case ':' :
                    rightRep = tbl[current][0] / tbl[current][1]
                    break;
                default: break;
            }

            if (parseInt(rep) === rightRep) {
                tempBool[current] = true;
                setTblBool(tempBool);
            }
            setCurrent(current + 1);
            setRep('');

            if (currentRound === 9) {
                setEnd(true)
                getScore(tempBool);
            }
        }
        else {
            alert('Il faut entrer un nombre !');
        }
    }

    const handleChangeRep = (e) => {
        const val = e.target.value;
        !isNaN(val) && setRep(val);
    }

    const getScore = (table) => {
        let finalScore = 0;
        for (let i = 0; i < 10; i++) {
            table[i] && finalScore++
        }
        setScore(finalScore);
    }

    
    return(
        <div className="calc">
            <div className="calc__ex">
                {
                    end ?
                        <>
                            <p>Score : {score}/10</p>
                            <button onClick={() => window.location.reload()}>Recommencer</button>
                        </>
                    :

                    <form onSubmit={checkAdd}>
                        <p>{tbl[current][0]} {calcType} {tbl[current][1]}</p>
                        <input type='text' value={rep} onChange={handleChangeRep}/>
                        <input type='submit' value='Suivant'/>
                    </form>
                }
            </div>
        </div>
    );
}

export default Calc;