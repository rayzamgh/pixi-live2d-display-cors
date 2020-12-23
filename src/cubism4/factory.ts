import { ModelSettings } from '@/cubism-common';
import { Cubism4InternalModel } from '@/cubism4/Cubism4InternalModel';
import { Cubism4ModelSettings } from '@/cubism4/Cubism4ModelSettings';
import { cubism4Ready } from '@/cubism4/setup';
import { Live2DFactory, Live2DFactoryOptions } from '@/factory/Live2DFactory';
import { CubismPose } from '@cubism/effect/cubismpose';
import { CubismMoc } from '@cubism/model/cubismmoc';
import { CubismModel } from '@cubism/model/cubismmodel';
import { CubismPhysics } from '@cubism/physics/cubismphysics';

Live2DFactory.registerRuntime({
    version: 4,

    ready: cubism4Ready,

    createModelSettings(json: any): Cubism4ModelSettings | undefined {
        if (Cubism4ModelSettings.isValidJSON(json)) {
            return new Cubism4ModelSettings(json);
        }
    },

    test(settings: ModelSettings): settings is Cubism4ModelSettings {
        return settings instanceof Cubism4ModelSettings;
    },

    createCoreModel(data: ArrayBuffer): CubismModel {
        const moc = CubismMoc.create(data);

        try {
            return moc.createModel();
        } finally {
            moc.release();
        }
    },

    createInternalModel(coreModel: CubismModel, settings: Cubism4ModelSettings, options?: Live2DFactoryOptions): Cubism4InternalModel {
        return new Cubism4InternalModel(coreModel, settings, options);
    },

    createPhysics(coreModel: CubismModel, data: any): CubismPhysics {
        return CubismPhysics.create(data);
    },

    createPose(coreModel: CubismModel, data: any): CubismPose {
        return CubismPose.create(data);
    },
});
