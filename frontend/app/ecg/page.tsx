import dynamic from 'next/dynamic'
const EcdPage = dynamic(() => import('../../components/clientPages/EcgPage'), {ssr: false})

export default function EcdServerPage() {
    return (
        <EcdPage />
    )
}
