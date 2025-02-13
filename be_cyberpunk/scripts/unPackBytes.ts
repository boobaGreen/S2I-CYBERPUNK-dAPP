import { ethers } from 'ethers';

const bytes32Value = '0x545241434b313233343536000000000000000000000000000000000000000000';

const unpackBytesToString = (bytes32: string): string => {
    return ethers.decodeBytes32String(bytes32);
};

const unpackedString = unpackBytesToString(bytes32Value);
console.log(`Unpacked string: ${unpackedString}`);