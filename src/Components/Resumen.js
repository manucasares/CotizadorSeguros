import React from "react";

export const Resumen = ({ marcaFinal, planFinal, yearFinal }) => {
    return (
        <div className="resumen-cotizacion text-center text-light">
            <h2>Resumen de Cotización</h2>

            <p>Marca: {marcaFinal}</p>
            <p>Plan: {planFinal}</p>
            <p>Año del auto: {yearFinal}</p>
        </div>
    );
};
