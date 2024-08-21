import { useMutation } from '@tanstack/react-query'
import apiClient from '../apiClient'
import { User,refreshResponse,UserClass } from '../types/types'
import { AxiosError } from 'axios';




export const fetchUser = async () => {
  console.log('tokenAutorizaion aqui estoy en fetchUser',apiClient.getUri());
    
    try {
      // console.log(token, 'token aqui estoy en fetchUser');
        const response = await apiClient.get<UserClass>('/auth/users/me/')
          return response.data
    } catch (error) {
        console.log(error);
        return
    }
  
}
export const useSigninMutation = () =>
  useMutation({
    mutationKey: ['signin'],
    mutationFn: async ({
      username,
      password,
    }: {
      username: string
      password: string
    }) =>
      (
        await apiClient.post<User>(`auth/login`, {
          username,
          password,
        })
      ).data,
      onSuccess:async (data) => {        
        await localStorage.setItem('token', data.accessToken)
        await localStorage.setItem('refreshToken', data.refreshToken)
        await localStorage.setItem('personal_id', JSON.stringify(data.user.personal))
        console.log('signinMutation', data);
        
      },
      
  })


export const useRefreshToken = async () =>{
  let successrefresh = false;
  await apiClient.post<refreshResponse>(`auth/refresh_token`, {
    refresh: localStorage.getItem('refreshToken'),
  }).then(async (response) => {
    console.log("refresh token antes de guardar", localStorage.getItem('refreshToken'));
    await localStorage.setItem('token', response.data.access);
    await console.log("refresh token despues de guardar", localStorage.getItem('refreshToken'));
    successrefresh = true;
  }
  ).catch((error) => {
    console.log(error, 'error aqui estoy en useRefreshTokenMutation');
    successrefresh = false;
  });
  return  successrefresh;
}

export const useVerfyToken  = async () =>{
  let successVerfyToken = false;
  const token = await localStorage.getItem('token');
  console.log(token, 'token aqui estoy en useVerfyTokenMutation');
  
  if (!token) {
    return successVerfyToken;
  }
  await apiClient.post(`auth/verify_token`, {
    accessToken:token ,
    
  }).then(() => {
    successVerfyToken = true;
  }
  ).catch(async (error) => {
    console.log(error, 'error aqui estoy en useVerfyTokenMutation');
    const successrefresh = await useRefreshToken();
    console.log(successrefresh, 'successrefresh aqui estoy en useVerfyTokenMutation');
    if(successrefresh){
      successVerfyToken = true;
    }
  });
  return successVerfyToken;
}

export const useLogoutMutation = () =>
  useMutation({
    mutationKey: ['logout'],
    mutationFn: async () => {
      await localStorage.removeItem('token')
      await localStorage.removeItem('refreshToken')
      console.log('logoutMutation');
    },
  })

export const useSignupMutation = (
  
) =>{
  return useMutation({
    mutationKey: ['signup'],
    mutationFn: async (
      {
        username,
        password,
        nombre,
        apellidos,
        correo,
        telefono,
        role,
      }: {
        username: string
        password: string
        nombre: string
        apellidos: string
        correo: string
        telefono: string
        role: number
      }
    ) =>
      (
        await apiClient.post(`auth/register`, {
          username,
          password,
          nombre,
          apellidos,
          correo,
          telefono,
          role,
        })
      ).data,
      onError: (error) => {
        if ((error as AxiosError).response) {
          console.log(error, 'error aqui estoy en useSignupMutation');
          alert(((error as AxiosError).response?.data as { error: string })?.error);
        } else {
          console.log(error, 'error aqui estoy en useSignupMutation');
          alert('An error occurred.');
        }
      },
      onSuccess:async (data) => {
        console.log('signupMutation', data);
        
      },
  })
  
}
