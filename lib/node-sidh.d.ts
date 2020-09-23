/// <reference types="node" />

    export function createPrivateA():Buffer;

    export function createPublicA(PrivateKeyA: Buffer): Buffer;

    export function createPrivateB():Buffer;

    export function createKeyPairA(cb: (PrivateKeyA: Buffer, PublicKeyA: Buffer) => void): void

    export function createKeyPairB(cb: (PrivateKeyB: Buffer, PublicKeyB: Buffer) => void): void

    export function sharedKeyA(PrivateKey: Buffer, PublicKey: Buffer): Buffer;

    export function sharedKeyB(PrivateKey: Buffer, PublicKey: Buffer): Buffer;

    export function TEST():Buffer;










