// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');
const Util = require('./util.js');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Welcome, to the Jasmine Dragon. How can I help you today?';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const AdviceIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AdviceIntent';
    },
    async handle(handlerInput) {
        const advices = await Util.listAllKeys('Media/Advice/');
        
        const audioUrl = Util.getS3PreSignedUrl(Util.pickRandom(advices).Key).replace(/&/g,'&amp;');
        
        const speakOutput = `<audio src="${audioUrl}"/>`;
        
         return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const MournIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'MournIntent';
    },
    async handle(handlerInput) {
        const audioUrl = Util.getS3PreSignedUrl("Media/irohleaves2.mp3").replace(/&/g,'&amp;');
        
        const speakOutput = `<audio src="${audioUrl}"/>`;
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
}
const SongIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'SongIntent';
    },
    async handle(handlerInput) {
        const songs = await Util.listAllKeys('Media/Songs/');

        const audioUrl = Util.getS3PreSignedUrl(Util.pickRandom(songs).Key).replace(/&/g,'&amp;');
        
        const speakOutput = `<audio src="${audioUrl}"/>`;
        
         return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
}
const TeaOpinionHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'TeaOpinionIntent';
    },
    async handle(handlerInput) {
        const opinions = await Util.listAllKeys('Media/Tea/TeaOpinion/');
        
        const audioUrl = Util.getS3PreSignedUrl(Util.pickRandom(opinions).Key).replace(/&/g,'&amp;');
        
        const speakOutput = `<audio src="${audioUrl}"/>`;
        
         return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
}
const HotLeafJuiceHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HotLeafJuiceIntent';
    },
    async handle(handlerInput) {
        const opinions = await Util.listAllKeys('Media/Tea/HotLeafJuice/');

        const audioUrl = Util.getS3PreSignedUrl(Util.pickRandom(opinions).Key).replace(/&/g,'&amp;');
        
        const speakOutput = `<audio src="${audioUrl}"/>`;
        
         return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
}
const HaveTeaHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HaveTeaIntent';
    },
    async handle(handlerInput) {
        const opinions = await Util.listAllKeys('Media/Tea/HaveTea/');

        const audioUrl = Util.getS3PreSignedUrl(Util.pickRandom(opinions).Key).replace(/&/g,'&amp;');
        
        const speakOutput = `<audio src="${audioUrl}"/>`;
        
         return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
}
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Ask me for advice, ask me to sing, ask me for my opinion of your tea, or call tea hot leaf juice if you dare. Or ask me about my son.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const StopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
const CancelIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent';
    },
    handle(handlerInput) {
        const audioUrl = Util.getS3PreSignedUrl("Media/Advice/thatsstupid.mp3").replace(/&/g,'&amp;');
        
        const speakOutput = `<audio src="${audioUrl}"/>`;
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('You can ask me something else.')
            .getResponse();
    }
}
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = `Sorry, I had trouble doing what you asked. Please try again.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        AdviceIntentHandler,
        MournIntentHandler,
        SongIntentHandler,
        TeaOpinionHandler,
        HotLeafJuiceHandler,
        HaveTeaHandler,
        HelpIntentHandler,
        CancelIntentHandler,
        StopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();
