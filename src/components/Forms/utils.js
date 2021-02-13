const getpayRate = (APIobject) => {
    return 10;
}

const getDuration = (APIobject) => {
    return 10;
}

const getOriginalPayment = (APIobject) => {
    return getpayRate(APIobject) * getDuration(APIobject);
}

const getNumberofLeaves = (APIobject) => {
    return 12;
}

const getSingleLeaveCost = (APIobject) => {
    return 100;
}

const getNumberofDelays = (APIobject) => {
    return 12;
}

const getSingleDelayCost = (APIobject) => {
    return 100;
}
const getLeavesCost = (APIobject) => {
    return getNumberofLeaves(APIobject) * getSingleLeaveCost(APIobject);
}

const getDelayCost = (APIobject) => {
    return getSingleDelayCost(APIobject) * getNumberofDelays(APIobject);
}

export {getpayRate,getDuration,getOriginalPayment,getLeavesCost,getDelayCost};