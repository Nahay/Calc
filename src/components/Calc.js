import { useState, useEffect } from "react";


const Calc = ({calcType, max, min}) => {

    const [current, setCurrent] = useState(0);
    const [tbl, setTbl] = useState(new Array(10).fill(0));
    const [tblBool, setTblBool] = useState(new Array(10).fill(false));
    const [rep, setRep] = useState('');
    const [end, setEnd] = useState(false);
    const [score, setScore] = useState(0);

    useEffect (() => {

        const genNum = (a,b) => Math.floor(Math.random() * (b-a+1)+a);
        let tempTbl = [];


        const listePremiers = (n) => {

            let tbl = [], racine = Math.sqrt(n), output = [];
        
            // tableau de 0 à (n - 1)
            for (let i = 0; i < n; i++) {
                tbl.push(true);
            }
        
            // Remove multiples of primes starting from 2, 3, 5,...
            for (let i = 2; i <= racine; i++) {
                if (tbl[i]) {
                    // on va de 4 à 4 plus petit que 1000000, et on augmente de 4+2 = 6
                    for (let j = i * i; j < n; j += i) {
                        tbl[j] = false;
                    }
                }
            }
            
            for (let i = 2; i < n; i++) {
                if(tbl[i]) {
                    output.push(i);
                }
            }
        
            return output;
        }

        if (calcType === ':') {
            for (let i = 0; i < 10; i++) {
                let ended = false;
                const premiers = listePremiers(max);

                while (!ended) {
                    let x = genNum(min, max);

                    if (!premiers.find(n => n === x)) {
                        let y = genNum(min, max);

                        if (x % y === 0 && x !== y) {
                            ended = true;
                            let numbs = [x, y];
                            tempTbl.push(numbs);
                        }
                    }
                }
            }
        }
        else if (calcType === '-') {
            for (let i = 0; i < 10; i++) {
                let ended = false;

                while (!ended) {
                    let x = genNum(min, max);
                    let y = genNum(min, x);
                        ended = true;
                        let numbs = [x, y];
                        tempTbl.push(numbs);
                }
            }
        }
        else {
            for (let i = 0; i < 10; i++) {
                let numbs = [genNum(min, max), genNum(min, max)];
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