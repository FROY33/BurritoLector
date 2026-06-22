import { Routes } from '@angular/router';
import { Login } from './components/auth/login/login';
import { Register } from './components/auth/register/register';
import { Forgot } from './components/auth/forgot/forgot';
import { Galeria } from './components/pages/galeria/galeria';
import { Notfound } from './components/pages/notfound/notfound';
import { Afinidad } from './components/pages/afinidad/afinidad';
import { Profile } from './components/pages/profile/profile';
import { Dash } from './components/pages/dash/dash';
import { Libros } from './components/pages/libros/libros';
import { adminGuardGuard } from './guards/admin-guard-guard';
import { authGuardGuard } from './guards/auth-guard-guard';
import { BurritoLayout } from './layout/burrito-layout/burrito-layout';
import { BurritoAdminLayout } from './layout/burrito-admin-layout/burrito-admin-layout';
import { Recursos } from './components/pages/recursos/recursos';
import { RecursosAgregar } from './components/pages/recursos-agregar/recursos-agregar';
import { RecursosEditar } from './components/pages/recursos-editar/recursos-editar';
import { RecursosEliminar } from './components/pages/recursos-eliminar/recursos-eliminar';



export const routes: Routes = [

    {
        path: '',
        redirectTo: 'auth/login',
        pathMatch: 'full'
    },
    {
        path: 'auth/login',
        component: Login
    },
    {
        path: 'auth/register',
        component: Register
    },
    {
        path: 'auth/forgot',
        component: Forgot
    },

    

    // Rutas para el rol LECTOR / USUARIO
    {
        path: 'burritolector',
        component: BurritoLayout,
        canActivate: [authGuardGuard],
        children: [
            {
                path: 'galeria',
                component: Galeria
            },
            { 
                path: 'libro/:id', 
                component: Libros 
            },
            {
                path: 'afinidad',
                component: Afinidad
            },
            {
                path: 'profile',
                component: Profile
            }
        ]
    },

    // Rutas para el rol ADMINISTRADOR
    {
        path: 'burritoadministrador',
        component: BurritoAdminLayout,
        canActivate: [adminGuardGuard],
        children: [
            {
                path: 'dash',
                component: Dash
            },
            {
                path: 'recursos',
                component: Recursos
            },
            { 
                path: 'recursos/agregar', 
                component: RecursosAgregar 
            },
        
            { 
                path: 'recursos/editar/:id',
                component: RecursosEditar 

            },
            { 
                path: 'recursos/eliminar/:id', 
                component: RecursosEliminar 
            },
        ]
    },

    {
        path: '**',
        component: Notfound
    }
];

