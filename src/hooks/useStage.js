import { useState } from 'react';

import { createStage } from '../gameHelpers';

export const useStage  = () => {
                              //this generates a clean board 
    const [stage, setStage] = useState(createStage())

    return[stage, setStage];
}