import '../../assets/css/ButtonBack.css'

export function ButtonBack (){

    const goBack = function () {
        history.back();
    }
    
    return <>
        <button onClick={goBack} className="history-back">Volver</button>
    </>;

}


