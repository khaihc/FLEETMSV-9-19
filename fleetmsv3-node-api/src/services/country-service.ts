import {db} from '../connection';

export const getCountries = async () => {
    return await db.query(`SELECT * FROM country`);
}

export async function getContryById(id: number){
    return await db.any(`SELECT * FROM country WHERE id = $1`, [id]);
}

export async function saveCountry(country: any){
    return await db.any(`INSERT INTO country(capital, code, continent, description, nationality)
        VALUES ($1, $2, $3, $4, $5)`,[country.capital, country.code, country.continent, country.description, country.nationality])
}

export async function updateCountry(id: number, country: any){
    return await db.any(
        `
            UPDATE public.country
            SET capital=$1, code=$2, continent=$3, description=$4, nationality=$5
            WHERE id = $6;
        `, [country.capital, country.code, country.continent, country.description, country.nationality, id])
}

export async function deleteCountry(id: number){
    return await db.any(`DELETE FROM country WHERE id = $1`, [id]);
}