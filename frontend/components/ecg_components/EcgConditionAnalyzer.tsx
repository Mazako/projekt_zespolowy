import {FC} from "react";
import {Modal} from "react-bootstrap";
import {ConditionAnalyzeResponse, Verdict} from "@/utilsTypeScript/ecdChart/types/ecgFiles";

export interface EcgConditionAnalyzerProps {
    visible: boolean;
    setVisible: (v: boolean) => void;
    conditionAnalyze?: ConditionAnalyzeResponse;
}

export const EcgConditionAnalyzer: FC<EcgConditionAnalyzerProps> = ({visible, setVisible, conditionAnalyze}) => {
    const getEmoji = (value: boolean) => {
        return value ? '✅' : '❌';
    };

    const translateVerdict = (verdict: Verdict) => {
        switch(verdict) {
            case 'bradycardia':
                return 'bradykardia';
                break;
            case 'tachycardia':
                return 'tachykardia';
                break;
            case 'normal':
                return 'Prawidłowy rytm zatokowy';
                break;
            case 'cannot determine':
                return 'Nie można określić';
        }
    }

    return (
        <Modal show={visible} onHide={() => setVisible(false)} size='lg'>
            <Modal.Header>Analiza syngału</Modal.Header>
            <Modal.Body>
                {
                    conditionAnalyze
                    &&
                    <div>
                        <p>Każdy zespół QRS poprzedzony jest załamkiem P w kanale I: {getEmoji(conditionAnalyze.pBeforeQrsI)}</p>
                        <p>Każdy zespół QRS poprzedzony jest załamkiem P w kanale II: {getEmoji(conditionAnalyze.pBeforeQrsII)}</p>
                        <p>Każdy zespół QRS poprzedzony jest załamkiem P w kanale AVR: {getEmoji(conditionAnalyze.pBeforeQrsAVR)}</p>
                        {
                            conditionAnalyze.pPositiveI
                            &&
                            <p>Załamki P dodatnie w kanale I: {getEmoji(conditionAnalyze.pPositiveI)}</p>
                        }
                        {
                            conditionAnalyze.pPositiveII
                            &&
                            <p>Załamki P dodatnie w kanale II: {getEmoji(conditionAnalyze.pPositiveII)}</p>
                        }
                        {
                            conditionAnalyze.pNegativeAVR
                            &&
                            <p>Załamki P ujemne w kanale AVR: {getEmoji(conditionAnalyze.pNegativeAVR)}</p>
                        }
                        {
                            conditionAnalyze.bpm
                            &&
                            <p>Uderzeń na minutę: {conditionAnalyze.bpm}</p>
                        }

                        <p className='text-danger'>Werykt: {translateVerdict(conditionAnalyze.verdict)}</p>
                    </div>
                }
            </Modal.Body>
        </Modal>
    );
};
