
<a name="readmemd"></a>

**[node-sidh](#readmemd)**

> [Globals](#globalsmd)

[![Build Status](https://travis-ci.com/aellison5505/node-sidh.svg?branch=master)](https://travis-ci.com/aellison5505/node-sidh)


<a name="classes_index_sha3md"></a>

**[node-sidh](#readmemd)**

> [Globals](#globalsmd) / ["index"](#modules_index_md) / Sha3

# Class: Sha3

## Hierarchy

* **Sha3**

## Index

### Methods

* [shake256](#shake256)

## Methods

### shake256

▸ **shake256**(`input`: Buffer, `outLength`: number): Promise\<Buffer>

*Defined in [index.ts:177](https://github.com/aellison5505/node-sidh/blob/b34f719/src/index.ts#L177)*

#### Parameters:

Name | Type |
------ | ------ |
`input` | Buffer |
`outLength` | number |

**Returns:** Promise\<Buffer>


<a name="classes_index_sidhmd"></a>

**[node-sidh](#readmemd)**

> [Globals](#globalsmd) / ["index"](#modules_index_md) / SIDH

# Class: SIDH

This class uses post-crypto SIDH and creates keyPairs and the shared secret.

## Hierarchy

* **SIDH**

## Index

### Constructors

* [constructor](#constructor)

### Properties

* [PrivateKey](#privatekey)
* [PublicKey](#publickey)
* [SenderKey](#senderkey)
* [SenderPublic](#senderpublic)

### Accessors

* [keyPair](#keypair)
* [senderKeyPair](#senderkeypair)

### Methods

* [createKeyPair](#createkeypair)
* [createPubA](#createpuba)
* [randomBytes](#randombytes)
* [senderKeys](#senderkeys)
* [sharedKey](#sharedkey)
* [sharedKeySender](#sharedkeysender)

## Constructors

### constructor

\+ **new SIDH**(): [SIDH](#classes_index_sidhmd)

*Defined in [index.ts:23](https://github.com/aellison5505/node-sidh/blob/b34f719/src/index.ts#L23)*

**Returns:** [SIDH](#classes_index_sidhmd)

## Properties

### PrivateKey

•  **PrivateKey**: Buffer

*Defined in [index.ts:20](https://github.com/aellison5505/node-sidh/blob/b34f719/src/index.ts#L20)*

___

### PublicKey

•  **PublicKey**: Buffer

*Defined in [index.ts:21](https://github.com/aellison5505/node-sidh/blob/b34f719/src/index.ts#L21)*

___

### SenderKey

•  **SenderKey**: Buffer

*Defined in [index.ts:22](https://github.com/aellison5505/node-sidh/blob/b34f719/src/index.ts#L22)*

___

### SenderPublic

•  **SenderPublic**: Buffer

*Defined in [index.ts:23](https://github.com/aellison5505/node-sidh/blob/b34f719/src/index.ts#L23)*

## Accessors

### keyPair

• get **keyPair**(): [keys](#interfaces_index_keysmd)

*Defined in [index.ts:63](https://github.com/aellison5505/node-sidh/blob/b34f719/src/index.ts#L63)*

**Returns:** [keys](#interfaces_index_keysmd)

___

### senderKeyPair

• get **senderKeyPair**(): [keys](#interfaces_index_keysmd)

*Defined in [index.ts:70](https://github.com/aellison5505/node-sidh/blob/b34f719/src/index.ts#L70)*

**Returns:** [keys](#interfaces_index_keysmd)

## Methods

### createKeyPair

▸ **createKeyPair**(): Promise\<[keys](#interfaces_index_keysmd)>

*Defined in [index.ts:47](https://github.com/aellison5505/node-sidh/blob/b34f719/src/index.ts#L47)*

Creates a key pair

**Returns:** Promise\<[keys](#interfaces_index_keysmd)>

key object

___

### createPubA

▸ **createPubA**(`privateKey`: Buffer): Promise\<Buffer>

*Defined in [index.ts:77](https://github.com/aellison5505/node-sidh/blob/b34f719/src/index.ts#L77)*

#### Parameters:

Name | Type |
------ | ------ |
`privateKey` | Buffer |

**Returns:** Promise\<Buffer>

___

### randomBytes

▸ **randomBytes**(`length`: number): Promise\<Buffer>

*Defined in [index.ts:36](https://github.com/aellison5505/node-sidh/blob/b34f719/src/index.ts#L36)*

Produces random bytes

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`length` | number | bytes  |

**Returns:** Promise\<Buffer>

___

### senderKeys

▸ **senderKeys**(): Promise\<[keys](#interfaces_index_keysmd)>

*Defined in [index.ts:84](https://github.com/aellison5505/node-sidh/blob/b34f719/src/index.ts#L84)*

**Returns:** Promise\<[keys](#interfaces_index_keysmd)>

___

### sharedKey

▸ **sharedKey**(`PrivateKey`: Buffer, `SenderPublicKey`: Buffer): Promise\<Buffer>

*Defined in [index.ts:100](https://github.com/aellison5505/node-sidh/blob/b34f719/src/index.ts#L100)*

#### Parameters:

Name | Type |
------ | ------ |
`PrivateKey` | Buffer |
`SenderPublicKey` | Buffer |

**Returns:** Promise\<Buffer>

___

### sharedKeySender

▸ **sharedKeySender**(`SenderPrivateKey`: Buffer, `PublicKey`: Buffer): Promise\<Buffer>

*Defined in [index.ts:106](https://github.com/aellison5505/node-sidh/blob/b34f719/src/index.ts#L106)*

#### Parameters:

Name | Type |
------ | ------ |
`SenderPrivateKey` | Buffer |
`PublicKey` | Buffer |

**Returns:** Promise\<Buffer>


<a name="classes_index_sikemd"></a>

**[node-sidh](#readmemd)**

> [Globals](#globalsmd) / ["index"](#modules_index_md) / SIKE

# Class: SIKE

This class implements the SIKE CryptoPQ.

## Hierarchy

* **SIKE**

## Index

### Constructors

* [constructor](#constructor)

### Properties

* [PrivateKey](#privatekey)
* [PublicKey](#publickey)

### Accessors

* [keyPair](#keypair)

### Methods

* [createKeyPair](#createkeypair)
* [decrypt](#decrypt)
* [encrypt](#encrypt)

## Constructors

### constructor

\+ **new SIKE**(): [SIKE](#classes_index_sikemd)

*Defined in [index.ts:119](https://github.com/aellison5505/node-sidh/blob/b34f719/src/index.ts#L119)*

**Returns:** [SIKE](#classes_index_sikemd)

## Properties

### PrivateKey

•  **PrivateKey**: Buffer

*Defined in [index.ts:118](https://github.com/aellison5505/node-sidh/blob/b34f719/src/index.ts#L118)*

___

### PublicKey

•  **PublicKey**: Buffer

*Defined in [index.ts:119](https://github.com/aellison5505/node-sidh/blob/b34f719/src/index.ts#L119)*

## Accessors

### keyPair

• get **keyPair**(): [keys](#interfaces_index_keysmd)

*Defined in [index.ts:139](https://github.com/aellison5505/node-sidh/blob/b34f719/src/index.ts#L139)*

**Returns:** [keys](#interfaces_index_keysmd)

## Methods

### createKeyPair

▸ **createKeyPair**(): Promise\<[keys](#interfaces_index_keysmd)>

*Defined in [index.ts:129](https://github.com/aellison5505/node-sidh/blob/b34f719/src/index.ts#L129)*

**Returns:** Promise\<[keys](#interfaces_index_keysmd)>

KeyPair as keys object

___

### decrypt

▸ **decrypt**(`privateKey`: Buffer, `cipherBytes`: Buffer): Promise\<Buffer>

*Defined in [index.ts:166](https://github.com/aellison5505/node-sidh/blob/b34f719/src/index.ts#L166)*

Takes the privatekey and ciphered bytes and returns the decrypted bytes

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`privateKey` | Buffer | Key from key pair. |
`cipherBytes` | Buffer | The encrypted bytes. |

**Returns:** Promise\<Buffer>

The decrypted shared bytes.

___

### encrypt

▸ **encrypt**(`publicKey`: Buffer): Promise\<[Buffer, Buffer]>

*Defined in [index.ts:151](https://github.com/aellison5505/node-sidh/blob/b34f719/src/index.ts#L151)*

Takes a public key and returns 32 bytes of shared data, and the bytes encrypted.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`publicKey` | Buffer | from SIKE key pair |

**Returns:** Promise\<[Buffer, Buffer]>


<a name="globalsmd"></a>

**[node-sidh](#readmemd)**

> Globals

# node-sidh

## Index

### Modules

* ["index"](#modules_index_md)


<a name="interfaces_index_keysmd"></a>

**[node-sidh](#readmemd)**

> [Globals](#globalsmd) / ["index"](#modules_index_md) / keys

# Interface: keys

Keys interface
PrivateJey: Buffer
PublicKey: Buffer

## Hierarchy

* **keys**

## Index

### Properties

* [PrivateKey](#privatekey)
* [PublicKey](#publickey)

## Properties

### PrivateKey

•  **PrivateKey**: Buffer

*Defined in [index.ts:11](https://github.com/aellison5505/node-sidh/blob/b34f719/src/index.ts#L11)*

___

### PublicKey

•  **PublicKey**: Buffer

*Defined in [index.ts:12](https://github.com/aellison5505/node-sidh/blob/b34f719/src/index.ts#L12)*


<a name="modules_index_md"></a>

**[node-sidh](#readmemd)**

> [Globals](#globalsmd) / "index"

# Module: "index"

## Index

### Classes

* [SIDH](#classes_index_sidhmd)
* [SIKE](#classes_index_sikemd)
* [Sha3](#classes_index_sha3md)

### Interfaces

* [keys](#interfaces_index_keysmd)
