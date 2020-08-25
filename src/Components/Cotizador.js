import React, { useState } from 'react'
import { useForm } from '../Hooks/useForm'
import { getDiferenciaYear } from '../Helpers/getDiferenciaYear'
import { Spinner } from './Spinner';
import { Resumen } from './Resumen';
import { Total } from './Total';
import { Warning } from './Warning';

export const Cotizador = () => {

    const [{marca, plan, year}, handleInputChange] = useForm({
        marca : "",
        plan : "",
        year : ""
    });

    const [valoresFinales, setValoresFinales] = useState({
        marcaFinal : '',
        planFinal : '',
        yearFinal : ''
    })
    const {marcaFinal, planFinal, yearFinal} = valoresFinales;


    const [warning, setWarning] = useState(false);

    const [showResult, setShowResult] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);

    const [resultado, setResultado] = useState(0)


    const handleSubmit = (e) => {
        e.preventDefault();
    
        if(marca.trim() === '' || marca === '--Selecione--' || year === '--Selecione--' || plan.trim() === '' || year.trim() === ''){
            setWarning(true);
            return;
        }

        setWarning(false);
        setShowResult(false);

        let resultado = 2000;

        const diferencia = getDiferenciaYear(year);

        //AÑO
        resultado -= ((diferencia * 3) * resultado / 100);

        //MARCA
        //Americano 15% //  Asiático 5%   //  Europeo 30%
        switch(marca){
            case 'americano':
                resultado *= 1.15;
                break;
            case 'asiatico':
                resultado *= 1.05;
                break;
            case 'europeo':
                resultado *= 1.30;
                break;
        }

        //PLAN
        //Básico aumenta 20% // Completo aumenta 50%
        plan === 'basico' ? resultado *= 1.2 : resultado *= 1.5

        //le sacamos los decimales de más
        setResultado(resultado.toFixed(2))

        //seteamos los valores finales para que el resumen no cambie cuando elija otra opcion en el input
        setValoresFinales({
            marcaFinal : marca,
            planFinal : plan,
            yearFinal : year
        })

        //activamos el spinner
        setShowSpinner(true);
        setTimeout( () => {
            setShowSpinner(false);
            setShowResult(true);
        }, 2000)

    }

    return (
        <div className='container bg-white'>

            <h3 className='titulo text-center text-white p-2'>
                Cotizador de Seguros
            </h3>
       
            {
                warning
                &&
                <Warning />
            }

            <form className='form' onSubmit={handleSubmit}>

                {/* marca */}
                <div className='input'>
                    <p>Marca:</p>
                    <select 
                        className='form-control'
                        onChange={handleInputChange}
                        name='marca'
                    >
                        <option value={null}>--Selecione--</option>
                        <option value='americano'>Americano</option>
                        <option value='europeo'>Europeo</option>
                        <option value='asiatico'>Asiático</option>
        
                    </select>
                </div>

                {/* año */}
                <div className='input'>

                    <p>Año:</p>
                    <select 
                        className='form-control'
                        onChange={handleInputChange}
                        name='year'
                    >
                        <option value={null}>--Selecione--</option>
                        <option value={2020}>2020</option>
                        <option value={2019}>2019</option>
                        <option value={2018}>2018</option>
                        <option value={2017}>2017</option>
                        <option value={2016}>2016</option>
                        <option value={2015}>2015</option>
                        <option value={2014}>2014</option>
                        <option value={2013}>2013</option>
                        <option value={2012}>2012</option>
                        <option value={2011}>2011</option>
                        <option value={2010}>2010</option>
                        <option value={2009}>2009</option>
                        <option value={2008}>2008</option>
                        <option value={2007}>2007</option>
                        <option value={2006}>2006</option>
                        <option value={2005}>2005</option>
                    </select>
                </div>
                
                {/* radio */}
                <div className='input'>
    
                    <p>Plan:</p>
    
                    <div className='label'>

                        <div className='form-check'>
                            <input  type='radio'
                                    onChange={handleInputChange}
                                    name='plan'
                                    id='basico'
                                    value='basico'
                                    className='form-check-input'
                            />
                            <label className='form-check-label' htmlFor='basico'>
                                Básico
                            </label>
                        </div>
                            
                        <div className='form-check'>
                            <input  type='radio'
                                    onChange={handleInputChange}
                                    name='plan'
                                    id='completo'
                                    value='completo'
                                    className='form-check-input'
                            />
                            <label className='form-check-label' htmlFor='completo'>
                                Completo
                            </label>
                        </div>
                    </div>

                </div>


                <button
                    type='submit'
                    className='btn btn-block btn-outline-info'
                >
                    COTIZAR
                </button>

            </form>

            {
                showSpinner
                &&
                <Spinner />
            }

            {
                showResult 

                &&

                <>
                    <Resumen
                        marcaFinal={marcaFinal}
                        planFinal={planFinal}
                        yearFinal={yearFinal}
                    />
                    <Total resultado={resultado}/>
                </>
            }
            
        </div>
    )
}
