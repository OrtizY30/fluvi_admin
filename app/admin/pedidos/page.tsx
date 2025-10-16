import Branches from '@/components/pedidos/Branches';
import HeaderPedidos from '@/components/pedidos/HeaderPedidos'
import PaymentMethod from '@/components/pedidos/PaymentMethod'
import getToken from '@/src/auth/token';
import { BranchsAPIResponseSchema, MethodsApiResponse } from '@/src/schemas';
import React from 'react'

async function getBranch() {
  const token = await getToken();
  const url = `${process.env.API_URL}/business/branch`;

  const req = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await req.json();

  const branches = BranchsAPIResponseSchema.parse(json);
  return branches;
}

async function getMethods() {
  const token = await getToken();
  const url = `${process.env.API_URL}/business/payment-method`;

  const req = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await req.json();

  const methods = MethodsApiResponse.parse(json);
  return methods;
}


export default async function pedidosPage() {
     const branches = await getBranch();
     const methods = await getMethods()
  return (
     <div className="flex-1 h-full  bg-surface-base overflow-auto  overflow-x-hidden">
      <HeaderPedidos/>
      <div className='md:p-10 pb-20 '>

      <PaymentMethod methods={methods} />
      <Branches branches={branches}/>
      </div>
    </div>
  )
}
