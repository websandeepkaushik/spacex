import * as SpaceXdata from '../SpaceXdata';
  
const {default : spaceXReducer} = SpaceXdata;

  describe('SpaceXdata ', () => {
    it('return the initial state', () => {
      expect(spaceXReducer(undefined, {})).toEqual({
        spaceXdata: {},
      });
    });
  
    it('handles saveResponseData', () => {
      expect(
        spaceXReducer(
          {
              spaceXdata:{}
          },
          {
            type: SpaceXdata.saveResponseData.type,
            payload: {
              data: {},
            },
          }
        )
      ).toEqual({ spaceXdata: {} });
    });
  
    it('handles saveResponseError', () => {
      expect(
        spaceXReducer(
          {},
          {
            type: SpaceXdata.saveResponseError.type,
            payload: {
              errors: [{ message: '' }],
            },
          }
        )
      ).toEqual({});
    });
  
    const spaceX = {spaceXReducer:{spaceXdata:{}}};
    it('handles getSpaceXdata', () => {
      expect(SpaceXdata.getSpaceXdata(spaceX)).toEqual(spaceX.spaceXReducer.spaceXdata);
    });
  });
  