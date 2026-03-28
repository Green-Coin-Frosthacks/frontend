import React from 'react'
import useAdmin from '../hooks/useAdmin'
import BinList from '../components/BinList.jsx'
import CreateBinForm from '../components/CreateBinForm.jsx'
import { PlusCircle, Trash, RefreshCw } from 'lucide-react';
import "../styles/binPages.style.scss"

function BinPages() {
  const { dustbins, isLoading } = useAdmin()

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center" style={{ background: 'var(--color-neutral-100)' }}>
        <div className="flex flex-col items-center gap-4">
          <RefreshCw className="animate-spin" size={32} style={{ color: 'var(--color-primary-500)' }} />
          <p className="font-medium tracking-wide" style={{ color: 'var(--text-secondary)' }}>Loading bin data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='bin-pages'>
      <div className="header-container">
        <h2>Dustbin Management</h2>
        <p>Monitor live capacities and manage smart bins across the facility.</p>
      </div>

      <div className='bin-layout'>
        <BinList dustbins={dustbins} />
        <CreateBinForm />
      </div>
    </div>
  )
}

export default BinPages